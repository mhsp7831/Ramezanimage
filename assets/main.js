const imageSrc = 'assets/ramezani.png';
    const canvas = document.getElementById('mainCanvas');
    const ctx = canvas.getContext('2d');
    const input = document.getElementById('textInput');
    const image = new Image();
    image.src = imageSrc;
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      draw();
    };

    input.addEventListener('input', draw);

    function roundRect(ctx, x, y, width, height, radius) {
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
      }
      

      function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      
        const radius = 15;
        ctx.save();
        roundRect(ctx, 0, 0, canvas.width, canvas.height, radius);
        ctx.clip();
      
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      
        const text = input.value;
        const lines = text.split('\n'); // تقسیم به خطوط
      
        ctx.font = 'bold 150px "Edu SA Hand", Lalezar';
        ctx.fillStyle = 'white';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 15;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
      
        const lineHeight = 160; // فاصله بین خطوط (با توجه به اندازه فونت)
        const x = canvas.width / 2;
        const baseY = canvas.height - 300 - ((lines.length - 1) * lineHeight) / 2;
      
        lines.forEach((line, index) => {
          const y = baseY + index * lineHeight;
          ctx.strokeText(line, x, y);
          ctx.fillText(line, x, y);
        });
      
        ctx.restore();
      }
      
      

    function downloadImage(format) {
        const radius = 15;
        const mimeType = format === 'webp' ? 'image/webp' : 'image/jpeg';
      
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
      
        // برش گوشه‌گرد
        roundRect(tempCtx, 0, 0, tempCanvas.width, tempCanvas.height, radius);
        tempCtx.clip();
      
        // کشیدن تصویر canvas اصلی روی canvas موقت
        tempCtx.drawImage(canvas, 0, 0);
      
        // ایجاد لینک دانلود
        const link = document.createElement('a');
        link.download = `output.${format}`;
        link.href = tempCanvas.toDataURL(mimeType);
        link.click();
      }
      