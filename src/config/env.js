let Env;

function setEnv () {
  const config_prod = {
    // 이 부분에 설정값을 입력해주세요
    url: 'prod'
  }
  const config_dev = {
    // 이 부분에 설정값을 입력해주세요
    url: 'dev'
  }
  
  if(window.location.hostname === 'localhost') {
    return config_dev
  } else {
    return config_prod
  } 
}

Env = setEnv()

export default Env