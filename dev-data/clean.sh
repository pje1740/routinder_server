# 도커 컨테이너 중지, 삭제
docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)

# 도커 이미지 삭제
docker rmi $(docker images -q)
