#include<stdio.h>
#include<omp.h>

int main()
{
   int x=10;
   int y=0;
   printf("Initial value of x is %d",x);

   #pragma omp parallel for firstprivate(x) lastprivate(y)
   for(int i=0;i<=5;i++)
   {
       x+=i;
       y=i;

       printf("thread %d process %d x value %d y value %d\n",omp_get_thread_num(),i,x,y);
   }
   printf("the final value of x is %d",x);
   printf("the final value of y is %d",y);

}
