<script>
  // *TOTALLY* based on https://www.npmjs.com/package/a11y-react-emoji by Sean McPherson.
  export let symbol = "";
  export let label = "";
</script>

<style>

</style>

<!-- I'm sure there's a more terse way of doing this, but this works just fine for me. -->
{#if label}
  <span class="emoji" role="img" aria-label={label} aria-hidden="false">
    {symbol}
  </span>
{:else}
  <span class="emoji" role="img" aria-hidden="true">{symbol}</span>
{/if}
