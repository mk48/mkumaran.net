---
title: Backtracking – 1000 locks and 1000 students problem
date: '2019-01-01'
---

A high school has a strange principal. On the first day, he has his students perform an odd opening day ceremony:

I'm sure I'll write a lot more interesting things in the future.

There are one thousand lockers and one thousand students in the school. The principal asks the first student to go to every locker and open it. Then he has the second student go to every second locker and close it. The third goes to every third locker and, if it is closed, he opens it, and if it is open, he closes it. The fourth student does this to every fourth locker, and so on. After the process is completed with the thousandth student, how many lockers are open?

We will use backtracking method to find the solution. This may be dirty way of solving this problem.

```C
#include <stdio.h>
 
#define TOTLOCKS 1000
#define TOTSTU 1000
 
int main(void) {
 
    int x, lc, openlocks;
    int locks[TOTLOCKS+1];
 
    //open all - 1st stu
    for (x=0; x<=TOTLOCKS; x++)
        locks[x] = 1;
 
    for (x=2; x<=TOTSTU; x++)
        for(lc=x; lc<=TOTLOCKS; lc+=x)
            locks[lc] = !locks[lc];
 
    //count open locks
    openlocks=0;
 
    for (x=1; x<=TOTLOCKS; x++)
        if (locks[x] == 1)
            openlocks++;
 
    printf("Open locks: %d", openlocks);
 
    return 0;
}
```

Output:

Open locks: 31

To read something about backtracking in C, please visit [this link](http://www.thegeekstuff.com/2014/12/backtracking-example/)
