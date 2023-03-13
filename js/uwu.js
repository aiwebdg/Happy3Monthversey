const s = (p) => {
  let demo1Shader, img, fft, audio, toggleBtn

  p.preload = () => {
    audio = p.loadSound('audio/inday.mp4')
    demo1Shader = p.loadShader('shaders/base.vert', 'shaders/d1.frag')
    img = p.loadImage('img/1.jpeg')
  }

  p.setup = () => {
      playBtn = document.querySelector('#play-btn')
      playBtn.addEventListener('click', () => {
        document.body.classList.add('start-anim')
          audio.loop()
      })

      p.pixelDensity(1)
      p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL)

      toggleBtn = document.querySelector('#toggle-btn')
      toggleBtn.addEventListener('click', () => {
        toggleBtn.classList.toggle('toggle--on')
        this.toggleAudio()
      })

      fft = new p5.FFT()
      p.shader(demo1Shader)

      demo1Shader.setUniform('u_resolution', [p.windowWidth, p.windowHeight])
      demo1Shader.setUniform('u_texture', img)
      demo1Shader.setUniform('u_tResolution', [img.width, img.height])
  }

  
  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight)
    demo1Shader.setUniform('u_resolution', [p.windowWidth, p.windowHeight])
  }

  toggleAudio = () => {
    if (audio.isPlaying()) {
      audio.pause()
    } else {
      audio.loop()
    }
  }
};

new p5(s)
