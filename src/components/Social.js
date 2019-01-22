import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

function Social() {
  return (
    <StaticQuery
      query={socialQuery}
      render={data => {
        const { social } = data.site.siteMetadata
        return <span>
          <a href={`https://twitter.com/${social.twitter}`}>twitter</a>
          ｜
          <a href={`https://github.com/${social.github}`}>github</a>
          </span>
      }}
    />
  )
}

const socialQuery = graphql`
  query {    
    site {
      siteMetadata {        
        social {
          twitter
          github
        }
      }
    }
  }
`

export default Social
