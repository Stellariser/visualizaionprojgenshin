<template>
  <div>
    <div class="about-section">
      <h2>A Team Paring tool for Genshin Impact!</h2>
    </div>

    <h2 style="text-align:center">Who We Are</h2>
    <div class="row">
      <div class="column">
        <div class="card">
          <img :src="require('@/assets/about_page/1.jpg')" alt="4" style="width:100%">
          <div class="container">
            <h2>Zongkai Zhang</h2>
            <p>Backend & Frontend Deisgn</p>
            <p>UI/UX Design</p>
            <p><strong>zongkai@kth.se</strong></p>
          </div>
        </div>
      </div>

      <div class="column">
        <div class="card">
          <img :src="require('@/assets/about_page/2.jpg')" alt="4" style="width:100%">
          <div class="container">
            <h2>Benhou Li</h2>
            <p>Visualization Design</p>
            <p>UI/UX Design</p>
            <p><strong>benhou@kth.se</strong></p>
          </div>
        </div>
      </div>

      <div class="column">
        <div class="card">
          <img :src="require('@/assets/about_page/3.jpg')" alt="4" style="width:100%">
          <div class="container">
            <h2>Peiyang Zheng</h2>
            <p>Visualization Design</p>
            <p>Data Processing</p>
            <p><strong>peiyang@kth.se</strong></p>
          </div>
        </div>
      </div>

      <div class="column">
        <div class="card">
          <img :src="require('@/assets/about_page/4.jpg')" alt="4" style="width:100%">
          <div class="container">
            <h2>Heming Liu</h2>
            <p>Data Processing</p>
            <p>Backend & Frontend Deisgn</p>
            <p><strong>hemingl@kth.se</strong></p>
          </div>
        </div>
      </div>
    </div>

    <h2 style="text-align:center">What We Do</h2>
    <div class="text-box">
      <p><strong>GenSynergy is a team paring tool for Genshin Impact players. We provide various statistics for different Genshin Impact characters (see more by clicking on the radar chart) and enable users to pick characters by clicking on the character image. After picking up the characters, you can view our analysis of your choice on the 'team' page which could help your final decision. We also provide some recommendations for those rookie players. Our work is based on previous findings on the visualization of video games [1], [3], [4] and on the analysis of data science of video games and game wiki production [2], [5].</strong></p>
    </div>

    <h2 style="text-align:center">Data & Source Code</h2>
    <div class="text-box">
      <p><strong>Our project is based on the "Genshin Impact - Teyvat Character Analysis" dataset available on Kaggle. This dataset provides an extensive compilation of character data from Genshin Impact, offering valuable insights into various statistics and attributes of the characters. Check more at <a href="https://www.kaggle.com/code/faryarmemon/genshin-impact-tevyant-character-analysis" target="_blank">Kaggle</a>. We have uploaded the complete code to Github, you can check more at <a href="https://github.com/Stellariser/visualizaionprojgenshin/tree/master" target="_blank">Github</a>.</strong></p>
    </div>

    <h2 style="text-align:center">Learning Objectives</h2>
    <div class="text-box">
      <p><strong>1. Design: We have collaboratively designed and developed an interactive visualization website for Genshin Impact, enabling users to freely construct teams from various characters and provide a deep analysis of their team compositions. We implemented interactive data transformations to visualize team dynamics and character stats effectively.
    We utilized visual mappings to represent character attributes and team synergies, enhancing user engagement and understanding. And we crafted view transformations that allow users to explore different team compositions through various data-driven lenses.</strong></p>
      <p><strong>2. Defend: We used Vue.js for constructing an interactive and user-friendly interface. We used GitHub for project management, version control, and collaboration.</strong></p>
      <p><strong>3. Critique: We have enhanced our critical thinking and analytical skills by identifying strengths and areas for improvement in peer projects. We contributed valuable feedback to peers, leading to a collaborative learning environment and driving mutual improvement.</strong></p>
      <p><strong>4. Demonstrate: We have adapted our presentation techniques to effectively communicate complex information in an agreeable way. We utilized our website’s interactive features during demonstrations to engage our audience and provide hands-on experience with our visualization tools.</strong></p>
      <p><strong>5. Evaluate: We have implemented user feedback mechanisms within our website to gather insights on user experience and satisfaction. We analyzed received feedback to identify trends and specific areas for improvement, demonstrating our commitment to continuous development and user-friendly design.</strong></p>
    </div>

    <h2 style="text-align:center">Demo Video</h2>
    <div class="video-container">
      <iframe width="840" height="473" src="https://www.youtube.com/embed/eMWUdpWNJrI?si=6D7fpViYLQKO2PHS" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    </div>

    <h2 style="text-align:center">Reference</h2>
    <div class="text-box">
      <p><strong>1. D. A. M. Mejorado and J. E. R. Marquez, "Visual analytics of team performance in online gaming," 2019 IEEE International Conference on Systems, Man and Cybernetics (SMC), Bari, Italy, 2019, pp. 3025-3030, doi: 10.1109/SMC.2019.8914387.</strong></p>
      <p><strong>2. Sköld, O. , "Getting-to-know: Inquiries, sources, methods, and the production of knowledge on a videogame wiki", Journal of Documentation, Vol. 73 No. 6, pp (2017). 1299-1321.</strong></p>
      <p><strong>3. Medler, Ben, and Brian Magerko. "Analytics of play: Using information visualization and gameplay practices for visualizing video game data." Parsons Journal for Information Mapping 3.1 (2011): 1-12.</strong></p>
      <p><strong>4. Moura, Dinara, Magy Seif El-Nasr, and Christopher D. Shaw. "Visualizing and understanding players' behavior in video games: discovering patterns and supporting aggregation and comparison." ACM SIGGRAPH 2011 game papers. 2011. 1-6.</strong></p>
      <p><strong>5. El-Nasr MS, Nguyen TH, Canossa A, Drachen A. Game data science. Oxford University Press; 2021 Sep 30.</strong></p>
    </div>

  </div>
</template>

<script>
export default {
  name: 'About',
};
</script>

<style scoped>
body {
  font-family: Arial, Helvetica, sans-serif;
  margin: 0;
}
.video-container {
  max-width: 900px; /* 最大宽度，可调整 */
  margin: 20px auto; /* 上下边距 20px，左右自动居中 */
}

*, *:before, *:after {
  box-sizing: inherit;
}

.column {
  float: left;
  width: 25%;
  margin-bottom: 16px;
  padding: 0 8px;
}

.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  margin: 8px;
}

.about-section {
  padding: 10px;
  text-align: center;
  background-color: #367da7; 
  color: white;
}

.container {
  padding: 0 16px;
}

.container::after, .row::after {
  content: "";
  clear: both;
  display: table;
}

.title {
  color: grey;
}

.button {
  border: none;
  outline: 0;
  display: inline-block;
  padding: 8px;
  color: white;
  background-color: #000;
  text-align: center;
  cursor: pointer;
  width: 100%;
}

.button:hover {
  background-color: #555;
}


.card img {
  display: block; 
  width: 100%;
  max-height: 300px; 
  object-fit: cover;
  margin: 0 auto; 
}

.text-box {
  max-width: 800px;
  margin: auto;
  text-align: left;
  line-height: 1.6;
  border: 1px solid #ccc; /* 灰色边框 */
  padding: 20px; /* 文本与边框的空间 */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* 可选的阴影效果 */
  background-color: hsl(218, 36%, 80%); /* 背景色 */
  border-radius: 10px; /* 圆角边框 */
}

@media screen and (max-width: 650px) {
  .column {
    width: 100%;
    display: block;
  }
}
</style>
