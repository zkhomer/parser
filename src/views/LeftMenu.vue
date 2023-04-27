<template>
  <div class="leftMenu__nav-wrapper">
    <nav>
      <ul>
        <li>
          <div><img src="https://content2.rozetka.com.ua/widget_logotype/full/original/229862237.svg" alt=""></div>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: "LeftMenu"
}
</script>

<style lang="scss" scoped>
.leftMenu__nav-wrapper{
  border: 1px solid black;
  background-color: #210d0d;
  position: fixed;
  left: 0px;
  top: 0;
  bottom: 0;
  min-width: 300px;
  transition: 0.4s ease-in;
  &:hover{
    left: 0;
   }
  ul{
    list-style: none;
    padding-left: 0;
  }
  li{
    border: 1px solid #9ca3af;
    margin: 5px;
    cursor: pointer;
  }
}
</style>
