<template>
    <div class="container container-fluid">
      <div class="error-page">
        <h2 class="headline text-yellow"> 404</h2>
        <div class="error-content">
          <h3><i class="fa fa-warning text-yellow"></i> Oops! Page not found.
            <br><router-link to="/">Take me home.</router-link>
          </h3>
        </div>
      </div>
    </div>
</template>
<style>
  .error-page {
    margin-top: 180px;
  }
  .error-content h3 {
    padding-top: 30px;
  }
</style>
<script>
  export default {
  }
</script>
<style>
  .not{
    text-align: center;
    font-size: 36px;
    margin-top: 20%;
  }
</style>
