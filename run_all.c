#include <stdio.h>
#include <stdlib.h>

int main()
{
    printf("Loading backend docker image...\n");
    system("docker load < jubuenor_backend_prueba2.tar");
    printf("Loading frontend docker image...\n");
    system("docker load < jubuenor_frontend_prueba2.tar");
    printf("Loading postgres docker image...\n");
    system("docker load < postgres.tar");

    printf("Running docker-compose...\n");
    system("docker compose -f docker-compose.yml up");
}