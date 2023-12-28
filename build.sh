# docker build -t leftyftw/nail-gallery:2.0 .
docker buildx build --platform linux/amd64 --push -t leftyftw/nail-gallery:latest -t leftyftw/nail-gallery:2.1 .
