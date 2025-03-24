<script>
  import { get } from "svelte/store";
  import { getData, getAnotherData } from "./sample";
  const { text, onclick, disabled, title } = $props();

</script>

<button class="button" {onclick} {disabled} {title}>
  {text}
</button>

<style>
  .button {
    align-items: center;
    background-color: #fff;
    border-radius: 12px;
    box-shadow:
      transparent 0 0 0 3px,
      rgba(18, 18, 18, 0.1) 0 6px 20px;
    box-sizing: border-box;
    color: #121212;
    cursor: pointer;
    display: inline-flex;
    flex: 1 1 auto;
    font-family: Inter, sans-serif;
    font-size: 1.2rem;
    font-weight: 700;
    justify-content: center;
    line-height: 1;
    margin: 0;
    outline: none;
    padding: 1rem;
    text-align: center;
    text-decoration: none;
    transition:
      box-shadow 0.2s,
      -webkit-box-shadow 0.2s;
    white-space: nowrap;
    border: 0;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
  }

  .button:hover {
    box-shadow:
      #121212 0 0 0 3px,
      transparent 0 0 0 0;
  }

  .button:disabled {
    cursor: not-allowed;
    box-shadow: none;
    opacity: 0.65;
  }
</style>
