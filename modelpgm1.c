#include<stdio.h>
#include<mpi.h>

int main(int argc,char** argv)
{
    MPI_Init(NULL,NULL);
    int world_size;
    MPI_Comm_size(MPI_COMM_WORLD,&world_size);
    int world_rank;
    MPI_Comm_rank(MPI_COMM_WORLD,&world_rank);
    int num;
    if(world_rank==0)
    {
        num=42;
        MPI_Send(&num,1,MPI_INT,1,0,MPI_COMM_WORLD);
        printf("The process 0 sends %d to the process 1\n",num);
    }
    else if(world_rank==1)
    {
        MPI_Recv(&num,1,MPI_INT,0,0,MPI_COMM_WORLD,MPI_STATUS_IGNORE);
        printf("The process 1 receives %d from process 0\n",num);
    }
    MPI_Finalize();
    return 0;

}
