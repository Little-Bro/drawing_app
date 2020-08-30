    getData();
    async function getData() {
      const response = await fetch('/api');
      const data = await response.json();

      for (item of data) {
        const root = document.createElement('p');
        const comment = document.createElement('div');
        const image = document.createElement('img');
        const date = document.createElement('div');
        const dateString = new Date(item.timestamp).toLocaleString();

        comment.textContent = `comment : ${item.comment}`;
        image.src = item.image64;
        date.textContent = dateString;

        root.append(comment, date, image);
        document.body.append(root);
      }
    }