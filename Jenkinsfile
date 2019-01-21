node {
    def imageName
    def auth
   stage('Github Checkout') { // for display purposes
        // Get some code from a GitHub repository
        git credentialsId: 'github-credentials', url: 'https://github.com/chaostheory1994/BaeBot.git'
        sh 'whoami'
   }
   stage('Building Docker Image') {
        imageName = "jmschreiner/baebot:1.${currentBuild.number}.0"
        withCredentials([string(credentialsId: 'BaebotToken', variable: 'baebotToken')]) {
            withCredentials([usernamePassword(credentialsId: 'baebot-reddit-client', passwordVariable: 'clientSecret', usernameVariable: 'clientId')]){
                withCredentials([usernamePassword(credentialsId: 'baebot-reddit-user', passwordVariable: 'password', usernameVariable: 'username')]){
                    auth = readJSON text: "{ \"token\": \"${baebotToken}\", \"reddit\": { \"clientId\": \"${clientId}\", \"clientSecret\": \"${clientSecret}\", \"username\": \"${username}\", \"password\": \"${password}\", \"userAgent\": \"Test Script\" }  }"
                }
            }
            
        }

        writeJSON file: 'auth.json', json: auth
        sh "docker build -t ${imageName} ."
   }
   stage('Pushing To DockerHub') {
        withCredentials([usernamePassword(credentialsId: 'docker-credentials', passwordVariable: 'dockerPwd', usernameVariable: 'dockerUser')]) {
            sh "docker login -u ${dockerUser} -p ${dockerPwd}"
        }
        sh "docker push ${imageName}"
   }
   stage('Run Container') {
        try {
            sh 'docker stop Baebot'
            sh 'docker rm Baebot'
        }
        catch (e){
            echo e.toString()
        }
        sh "docker run --name=Baebot --restart=always -d ${imageName}"
   }
}