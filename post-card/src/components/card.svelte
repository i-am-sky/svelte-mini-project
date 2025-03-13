<script>
  const { cardItem } = $props();
</script>

<div class="card">
  <h2><span class="user-id">{cardItem.id}.{" "}</span>{cardItem.title}</h2>
  <p>
    {cardItem.body}
  </p>
</div>

<style>
  .card {
    width: 350px;
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.1);
    text-align: left;
    min-height: 300px;
  }
  .card h2 {
    margin: 0;
    color: #333;
  }

  .card h2 span {
    font-weight: inherit;
    font-size: inherit;
    color: inherit;
  }
  .card p {
    color: #555;
    font-size: 14px;
    margin-top: 10px;
  }
  .user-id {
    font-size: 12px;
    color: #777;
  }
</style>
