---
title: Deploye nextjs app in Azure devops
date: '2023-05-09'
---

## Config the NextJs project

add `output` config as `standalone` in the `next.config.js`

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: false,
})
module.exports = withBundleAnalyzer(nextConfig)
```

Build nextJs using `npm run build`
After build, we can see a new folder `standalone` in the `.next` folder.
![Standalone folder](standalone-folder.png)

### Copy below folders into standalone folder

1. Copy public folder into ./next/standalone
2. Copy .next/static into ./next/standalone/static

![Copy folders into standalone](copy-folders-into-standalone.png)

### Run the standalone folder

open the standalone folder in a command prompt and run `node server.js` which will start the server.
Now, open the browser and go to localhost:3000 and ensure that the website is working fully.
We are going to deploy only the standalone folder.

## Create new pipeline

go to azure devops and pipelines then click "new pipeline"
![New pipe line](new-pipe-line-button.png)

select 'Azure repos git'
![Select Azure repos git](select-azure-repos-git.png)

then select your repository.

Select Node.js from configure section.
![Select nodejs pipe line](select-nodejs-pipeline.png)

we will get generated yaml code, just click 'Save and run'
![Review yaml pipe line code](review-yaml-pipeline-code.png)
You can edit the config file now or later. If you do later then you have to check-in the changes.

Below is my final yml.

```yml
trigger:
  - none

pool:
  vmImage: ubuntu-latest

steps:
  - task: NodeTool@0
    inputs:
      versionSpec: '18.x'
    displayName: 'Install Node.js'

  - script: |
      npm install
    displayName: 'npm install'

  - task: Cache@2
    displayName: 'Cache .next/cache'
    inputs:
      key: 'next | $(Agent.OS) | package-lock.json'
      path: '$(System.DefaultWorkingDirectory)/.next/cache'

  - script: |
      npm run build
    displayName: 'npm build'

  - task: CopyFiles@2
    displayName: 'Copy standalone'
    inputs:
      sourceFolder: '$(Build.SourcesDirectory)/.next/standalone'
      Contents: '**'
      TargetFolder: '$(Build.ArtifactStagingDirectory)/standalone'

  - task: CopyFiles@2
    displayName: 'Copy public'
    inputs:
      sourceFolder: '$(Build.SourcesDirectory)/public'
      Contents: '**'
      TargetFolder: '$(Build.ArtifactStagingDirectory)/standalone/public'

  - task: CopyFiles@2
    displayName: 'Copy .next/static'
    inputs:
      SourceFolder: '$(Build.SourcesDirectory)/.next/static/'
      Contents: '**'
      TargetFolder: '$(Build.ArtifactStagingDirectory)/standalone/.next/static'

  - task: ArchiveFiles@2
    inputs:
      rootFolderOrFile: '$(Build.ArtifactStagingDirectory)/standalone'
      includeRootFolder: false
      archiveType: 'zip'
      archiveFile: '$(Build.ArtifactStagingDirectory)/$(Build.BuildId).zip'
      replaceExistingArchive: true

  - task: PublishPipelineArtifact@1
    displayName: 'Publish artifact'
    inputs:
      targetPath: '$(Build.ArtifactStagingDirectory)/$(Build.BuildId).zip'
      artifact: '********'        <-- give your own name
      publishLocation: 'pipeline'
```

give a commit message and click 'save and run'
![Give a commit message](Give-commit-message.png)

it's running, once done you can see success tick and published artifcate.
![Pipeline running completed](pipeline-completed.png)

## Create new Azure service

In azure, we have to create a new `App service`
Here I have selected windows as OS, but I suggest you to stick with Linux for NodeJs.
![Create new app service basic tab](new-app-service-basic.png)

In the next deployment tab, select disable, because we are not using GitHub's action.
![Don't select github action](dont-select-github-ci-cd.png)

Below is the final review+create screen for full information.
![Review create](Review-create.png)

Once the service is created, you can see the running status.
![App service created](app-service-created.png)

Create slots for staging
Open the created app service
go to deployment slots section
add slot.
![Create slots for staging](slots-for-staging.png)

give a name for the slot.
Select the main app service in the clone settings dropdown.
Click add.
![Name for slot](name-for-slot.png)

Once that's done, we can see one more app service with `slot`
![Deployment slots](deployment-slots.png)

## Create new Release

### Create staging release pipeline

Click Release, and new then `New release pipeline`
![Release new pipeline](release-new.png)

Select NodeJs as a template.
![NodeJs from pipeline](select-nodejs-from-pipeline.png)

Give a name for stage, like test, dev, or pre-prod whatever. Then close this popup.
![Name for staging env](give-name-for-staging.png)

Name for the release pipeline
![Name for the release pipe line](name-for-the-release-pipeline.png)

Select Artifact
select build pipeline
give a source alias
![Select artifact](select-artifacts.png)

Select staging
Go to tasks tab
![Move to tasks tab](move-to-tasks-tab.png)

In parameter section click `unlink all`. I don't have that in the below screen.
![Unlink parameter](unline-in-parameter.png)

1. Select run on agent
2. give a name for display
3. select azure pipelines
4. i have selected `windows` but better stick with `linux`
5. Ensure your artifact selected

![Agent settings](agent-settings.png)

Make changes in the `Deploy azure app service` like below image
![App service settings](app-service-settings.png)

### Create production release pipeline

clone staging to create production release
![Clone staging pipeline](clone-staging-for-production.png)

Change the stage name as production
![Change stage name](changing-stage-name.png)

It's important to change the production's slot as production.
![Change slot as production](change-slot-as-production.png)

Create relase
![Create release](create-release.png)

Select all, we will do manual trigger.
![Manual trigger](manual-trigger.png)
