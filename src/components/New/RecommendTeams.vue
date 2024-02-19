<template>
  <div class="recommend-groups">
    <el-row :gutter="20" v-for="group in groups" :key="group.id">
      <el-col :span="24">
        <el-card class="group-card">
          <div class="team-header">
            <img :src="group.image" class="team-image" alt="Team Image">
            <div class="team-description">
              <h2>{{ group.name }}</h2>
              <p><strong>Characters:</strong> {{ group.characters.map(c => c.name).join(', ') }}</p>
              <p><strong>Pros:</strong> {{ group.pros }}</p>
              <p><strong>Cons:</strong> {{ group.cons }}</p>
            </div>
          </div>
          <div class="team-characters">
            <el-row :gutter="10">
              <el-col :span="6" v-for="character in group.characters" :key="character.id">
                <el-card>
                    <div>{{ character.name }}</div>
                    <div :class="`${character.role.toLowerCase()}-role`">{{ character.role }}</div>
                </el-card>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'RecommendGroups',
  data() {
    return {
      groups: [
        {
          id: 1,
          name: 'Three Rocks',
          image: require('@/assets/recommend_teams/1.png'),
          pros: 'The burst strength of the Three Rocks is definitely one of the best, and the output strength of the Three Rocks is the highest among all the station main C-type playstyles.',
          cons: 'It relies heavily on Ichidou to open his moves, and if he cant maintain a high intensity output after opening his moves and cant eat the balls, then the whole teams cycle will be out of whack ',
          characters: [
            { id: 1, name: 'Gorou', role: 'DPS' },
            { id: 2, name: 'Albedo', role: 'Support'},
            { id: 3, name: 'Lumine', role: 'Healer'},
            { id: 4, name: 'Arataki', role: 'Tank'}
          ]
        },

        {
          id: 2,
          name: 'Thunder Nation',
          image: require('@/assets/recommend_teams/2.png'),
          pros: 'Explosive output strength, wide range of attribute strikes, and high degree of fault tolerance are the optimal solutions for the current lineups',
          cons: 'Almost no shortcomings',
          characters: [
            { id: 1, name: 'Xingqiu', role: 'DPS' },
            { id: 2, name: 'Bennet', role: 'Support'},
            { id: 3, name: 'Raiden', role: 'Healer'},
            { id: 4, name: 'Xiangling', role: 'Tank'}
          ]
        },

        {
          id: 3,
          name: 'Team Yura',
          image: require('@/assets/recommend_teams/3.png'),
          pros: 'The output strength of is very high and can reach the level of a tier 1 lineup',
          cons: 'Poor stability, the main problem focuses on the fact that Yuras moves are timed rather than instant, and tend to suffer when encountering certain mechanic monsters, especially the kind that locks up the blood, or the kind that likes to run around',
          characters: [
            { id: 1, name: 'Lumine', role: 'DPS' },
            { id: 2, name: 'Zhongli', role: 'Support'},
            { id: 3, name: 'Rosiara', role: 'Healer'},
            { id: 4, name: 'Yura', role: 'Tank'}
          ]
        },
      ]
    };
  },
};
</script>


<style scoped>
.recommend-groups {
  margin: 20px;
}

.group-card {
  margin-bottom: 20px;
  overflow: hidden;
}

.team-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.team-image {
  width: 500px;
  margin-right: 20px;
}

.team-description h2 {
  margin: 0;
  font-size: 1.5em;
}

.team-characters {
  margin-top: 20px;
}

.character-avatar {
  width: 100%;
  display: block;
  margin-bottom: 10px;
}

.dps-role {
  color: #e63946;
}

.support-role {
  color: #f4a261; 
}

.healer-role {
  color: #2a9d8f;
}

.tank-role {
  color: #ccd2d4;
}

</style>
