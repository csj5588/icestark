(function() {
  document.body.addEventListener('click', function(e) {
    if (e.target.nodeName === 'IMG') {
      let temp = e.target;
      while (temp && temp.nodeName !== 'TD') {
        temp = temp.parentNode;
      }
      
      // 图片不存在直接返回
      let temImgObj = new Image();
      temImgObj.src = e.target.getAttribute('src'); 
      if (temImgObj.fileSize <= 0 || (temImgObj.width <= 0 && temImgObj.height <= 0) || !temp) {
        return;
      }

      if (temp && temp.nodeName === 'TD') {
        if (temp.classList.contains('image-preview')) {
          return
        }
        let imgContent = e.target.getAttribute('src');
        let dv = document.createElement('div');
        dv.classList.add('bg-img');
        dv.innerHTML = `
                      <div class='tra-img'>   
                          <img src=${imgContent} class='zoom-out'>     
                      </div>
                    `
        document.body.appendChild(dv);

        document.querySelector('.zoom-out').onload = function() {
          let originWidth = this.width;
          let originHeight = this.height;
        // 最大尺寸限制
          let maxWidth = 800;
          let maxHeight = 800;
        // 目标尺寸
          let targetWidth = originWidth;
          let targetHeight = originHeight;
        // 图片尺寸超过800x800的限制
          if (originWidth > maxWidth || originHeight > maxHeight) {
            if (originWidth / originHeight > maxWidth / maxHeight) {
                // 更宽，按照宽度限定尺寸
              targetWidth = maxWidth;
              targetHeight = Math.round(maxWidth * (originHeight / originWidth));
            } else {
              targetHeight = maxHeight;
              targetWidth = Math.round(maxHeight * (originWidth / originHeight));
            }
          }

          this.width = targetWidth;
          this.height = targetHeight;

          let imgObj = document.querySelector('.bg-img');
          imgObj.style.width = '100%';
          imgObj.style.height = '100%';
          imgObj.style.display = 'block';
        }

        document.querySelector('.bg-img').onclick = function() {
          this.remove()
        }
      }
    }
  }) 
})()