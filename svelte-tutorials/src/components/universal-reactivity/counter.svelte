<script>
  import { createCounter } from "./counter.svelte.js";

  let counter = createCounter();
</script>

<button
  onclick={() => {
    counter.count++;
  }}>{counter.count}</button
>
