#include<stdio.h>
#include<mpi.h>

int main(int argc,char** argv)
{
   MPI_Init(NULL,NULL);
   int size;
   MPI_Comm_size(MPI_COMM_WORLD,&size);
   int rank;
   MPI_Comm_rank(MPI_COMM_WORLD,&rank);
   if(size<4)
   {
       if(rank==0)
       {
           printf("Needs minimum 4 process to execute");
       }
       MPI_Finalize();
       return 0;
   }

   int num;
   if(rank==0)
   {
       for(int i=1;i<=3;i++)
       {
           MPI_Recv(&num,1,MPI_INT,i,0,MPI_COMM_WORLD,MPI_STATUS_IGNORE);
           printf("Process 0 gets message %d from %d\n",num,i);
       }
   }
   else if(rank>=1 && rank<=3)
   {
       num=rank*10;
       MPI_Send(&num,1,MPI_INT,0,0,MPI_COMM_WORLD);
       printf("process %d sends message %d to process 0\n",rank,num);
   }
   MPI_Finalize();
   return 0;
}
