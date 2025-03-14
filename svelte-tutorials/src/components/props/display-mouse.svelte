<script>
  import Mouse from "./mouse.svelte";

  let coords = $state({ x: 0, y: 0 });
</script>

<Mouse bind:coords />

<h3>X: {coords.x}; Y: {coords.y}</h3>
