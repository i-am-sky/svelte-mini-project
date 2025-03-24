<script>
    export let message = "";
    export let show = false;
  </script>
  
  {#if show}
    <div class="toast">{message}</div>
  {/if}
  
  <style>
    .toast {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 10px 20px;
      border-radius: 8px;
      animation: fadeInOut 3s ease-in-out;
    }
  
    @keyframes fadeInOut {
      0% { opacity: 0; transform: translateY(10px); }
      10% { opacity: 1; transform: translateY(0); }
      90% { opacity: 1; transform: translateY(0); }
      100% { opacity: 0; transform: translateY(10px); }
    }
  </style>
  