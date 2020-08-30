function setup() {
  const cnv = createCanvas(300, 300);
  cnv.position(300, 100);
  background(0);

  const items = ['heart', 'face', 'star'];
  const index = Math.floor(Math.random() * items.length);
  const item = items[index];
  document.getElementById('draw').textContent = `Draw a ${item}`;
  document.getElementById('submit').onclick = async () => {
    const comment = document.getElementById('input').value;
    cnv.loadPixels();
    const image64 = cnv.elt.toDataURL();
    const data = {
      comment,
      image64
    };
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
    const response = await fetch('/api', options)
    const jsonData = await response.json();
    console.log(jsonData);
  };
  document.getElementById('erase').onclick = () => {
    background(0);
  }
}

function mouseDragged() {
  stroke(255);
  strokeWeight(4);
  line(mouseX, mouseY, pmouseX, pmouseY);
}