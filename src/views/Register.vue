<template>
  <div class="register-box">
    <div class="register-logo">
      <router-link to="/">Register <b>Chalk</b></router-link>
    </div>

    <div class="register-box-body">
      <p class="login-box-msg">Register a new membership</p>

      <form action="../../index.html" method="post">
        <div class="form-group has-feedback">
          <input type="text" class="form-control" placeholder="Nickname">
          <span class="fa fa-user-circle-o form-control-feedback"></span>
        </div>
        <div class="form-group has-feedback">
          <input type="email" class="form-control" placeholder="Email">
          <span class="fa fa-envelope form-control-feedback"></span>
        </div>
        <div class="form-group has-feedback">
          <input type="password" class="form-control" placeholder="Password">
          <span class="fa fa-lock form-control-feedback"></span>
        </div>
        <div class="form-group has-feedback">
          <input type="password" class="form-control" placeholder="Admin Password">
          <span class="fa fa-sign-in form-control-feedback"></span>
        </div>
        <div class="row">

          <!-- /.col -->
          <div class="col-xs-4 col-xs-offset-8">
            <button type="submit" class="btn btn-primary btn-block btn-flat">Register</button>
          </div>
          <!-- /.col -->
        </div>
      </form>


      <router-link :to="{name:'login'}" class="text-center">I already have a membership</router-link>
    </div>
    <!-- /.form-box -->
  </div>
</template>

<script>
</script>
