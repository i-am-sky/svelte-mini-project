<script>
  class Todo {
    text = $state();
    done = $state(false);

    constructor(text) {
        this.text = text
    }
  }

  const todo = new Todo({
    text: "js is awesome"
  })
</script>
