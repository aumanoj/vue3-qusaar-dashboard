<template>
  <q-page class="q-py-sm q-px-sm">
   <!--  <div  >
    <div class="content" style="background-image: url(/img/coming_soon.jpg);background-size: contain; background-repeat: no-repeat;">
      <div class="text-h3 text-weight-bold">COMING SOON!</div>

      <p class="text-subtitle1">Our website is under construction. We`ll be here soon<br />with our new awesome site. Subscribe to be notified.</p>

      <form action="">
        <input id="form-email" name="form-email" type="email" placeholder="Your email address" />
        <input type="submit" value="Notify me" />
      </form>
    </div>
</div> -->
  </q-page>
</template>
<script>
    export default {
      data(){
        return {
        }
      }
    }
</script>
<style>
.content {
  position: absolute;
}
.content {
  top: 50%;
  left: 50%;
  text-align: center;
  color: #fff;
  transform: translate(-50%, -50%);
  
  }

.content h1 {
    margin-top: 0;
  }
  .content form {
    margin: auto;
    display: table;
  }
  
  .content input {
    float: left;
    font-size: 16px;
    border: 1px solid #fff;
  }
  
  .content input[type=email] {
    padding: 12px;
    background: #fff;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }
  .content input[type=submit] {
    padding: 12px 24px;
    color: #fff;
    background: transparent;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    cursor: pointer;
    transition: all .235s ease-in-out;
  }

  .content input[type=submit]:hover {
      color: #212121;
      background: #fff;
    }
    .wrapper main {
     background: transparent; 
}
main {
     background: aliceblue; 
}
</style>


