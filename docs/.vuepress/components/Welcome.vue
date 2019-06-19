<template>
    <div class="welcome-contain">
        <svg-background-image />
        <div class="background"></div>
        <div class="content-wrapper">
            <div class="content">
                <h2 class="title">前端 使人沙雕</h2>
                <p class="subtitle">
                    Front End Makes Us Silly B
                </p>
                <div class="buttons">
                    <a href="/share/">
                        <button type="button" class="button" role="button">
                            前方高能
                            <div class="right-icon"></div>
                        </button>
                    </a>
                </div>
                <div class="gitContainer"></div>
            </div>
        </div>
    </div>
</template>

<script>
import SvgBackgroundImage from "./SvgBackgroundImage.vue";

export default {
  name: "Welcome",
  components: {
    SvgBackgroundImage
  }
};
</script>

<style lang="less">
.welcome-contain {
  .backgroundImg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-size: cover;
    background-position: center;
  }
  .button {
    display: inline-block;
    font-size: 1.2rem;
    color: #fff;
    background-color: #3eaf7c;
    padding: 0.8rem 1.7rem;
    border-radius: 4px;
    transition: background-color 0.1s ease;
    box-sizing: border-box;
    border: none;
  }
  .leftButton {
    margin-right: 20px;
  }
  .title {
    text-align: center;
    font-size: 78px;
    letter-spacing: 4px;
    line-height: 60px;
    color: #000;
    margin-bottom: 30px;
    border: none;
  }
  .subtitle {
    width: 700px;
    font-size: 22px;
    margin: 0;
    color: #000;
    text-shadow: #c8c8c8 1px 1px 2px;
    text-align: center;
    line-height: 1.7em;
    font-weight: 100;
  }
  .gitContainer {
    margin-top: 30px;
    text-align: center;
  }
  .right-icon {
    margin-left: 5px;
    display: inline-block;
    width: 10px;
    height: 10px;
    border-right: 1px solid rgb(255, 255, 255);
    border-bottom: 1px solid rgb(255, 255, 255);
    transform: rotate(-45deg);
  }
  .content-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    .content {
      padding-left: 15px;
      padding-right: 15px;
      padding-bottom: 50px;
    }
  }
  .background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-size: cover;
  }
  .buttons {
    text-align: center;
    margin-top: 70px;
  }
}
</style>