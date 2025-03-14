<script>
    let count = $state(0);
    let double = $derived(count*2);
  
  
    const increment = () => {
      count++;
  
      console.log({count, double})
  
    };
  </script>
  
  <h2>
      {count}
  </h2>
  <button onclick={increment}>increment</button>
  
  <style>
  </style>
  