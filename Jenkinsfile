 pipeline{
  agent any
  environment{
    VALUE = 2
  }
  stages {
    stage ("build"){
      steps{
        nodejs('Node-23-2-0'){
            sh 'pm2 stop index || echo "not running"'
        }
        echo 'building........'
        sh 'echo '
      }
    }

   stage ("installing node"){
    steps{
     // Install Node.js
     sh '''
     curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
     sudo apt install -y nodejs
     sudo npm install -y -g pm2
     '''
    }
   }
    
    stage("test"){
      steps{
        echo 'testing........'
        echo "The value is ${VALUE}"
        nodejs('Node-23-2-0'){
         sh 'npm install'
         sh 'npm install -g pm2'
         sh 'pm2 start index.js'
         sh 'pm2 list index'
        }
      }
    }

    stage("deploy"){
      steps{
        echo 'deploying........'
      }
    }
  }
}
