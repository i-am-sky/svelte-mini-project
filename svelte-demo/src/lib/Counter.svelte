<script>
  let count = $state(0);
  const increment = () => {
    count += 1;
  };
  const decrement = () => {
    count -= 1;
  };
  const reset = () => {
    count = 0;
  };
</script>

<button onclick={increment}>
  Increment {count}
</button>
<button onclick={decrement}>
  Decrement {count}
</button>
<button onclick={reset}>
  Reset {count}
</button>
