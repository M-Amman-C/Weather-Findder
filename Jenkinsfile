 pipeline{
  agent any
  environment{
    VALUE = 2
  }
  stages {
    stage("build"){
      steps{
        echo 'building........'
        sh 'echo '
      }
    }
    
    stage("test"){
      steps{
        echo 'testing........'
        echo "The value is ${VALUE}"
        nodejs('Node-23-2-0'){
         sh 'npm install'
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
