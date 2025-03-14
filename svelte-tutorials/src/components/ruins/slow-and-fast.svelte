<script>
  let ellapsed = $state(0);
  let millis = $state(1000);

  $effect(() => {
    const interval = setInterval(() => {
      ellapsed++;
    }, millis);

    return () => clearInterval(interval);
  });

  const slowDown = () => {
    millis *= 2;
  };

  const speedUp = () => {
    millis /= 2;
  };
</script>

<h2>
  {ellapsed}
</h2>
<button onclick={slowDown}>Slow</button>
<button onclick={speedUp}>Fast</button>

<style>
</style>
