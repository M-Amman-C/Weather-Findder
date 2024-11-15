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
        sh "The value is ${VALUE}"
        sh 'pwd'
      }
    }

    stage("deploy"){
      steps{
        echo 'deploying........'
      }
    }
  }
}
