<script>
  import moment from "moment";

  export let symbol, title, date;

  let timeFromNow = moment(date).fromNow();
</script>

<style>

</style>

<section>
  <h4>{symbol}</h4>
  <h2>{title}</h2>
  <p>{moment(date).format('MMM D, YYYY')}</p>
  <h3>{timeFromNow}</h3>
</section>
