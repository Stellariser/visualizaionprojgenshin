- tag.; enum{dmg; vd; ast; hlr}: 
  - 表示角色在队伍中可能的定位['dmg'=damage dealer主C; 'vd'=vice dmg副C; 'ast'=assist辅助; 'hlr'=healer奶妈]，一个角色可以同时是多种定位，如班尼特bannett同时是ast&hlr。
  
- lcl/glbtier_tag.; INT: 
  - 该角色在某定位的本地（本元素角色中）和全局（所有角色中）的tier。如果要按元素组队，就看本地tier（lcltier_tag.），如果不考虑元素组队，就看全局tier（glbtier_tag.）。

- visbm_indiv/glb; enum{元素属性}: 
  - 'vision best match_individual/global'，从元素方面考虑的（个人向/元素向）最佳搭配。比如申鹤的个人技能能为冰系加伤害，她和冰系的相性是她个人技能所决定的，那么visbm_indiv为冰系，而申鹤本身是冰系，也可以配合火系/雷系，她和这两个系的相性是她所属元素属性决定的，那么visbm_glb就是火系/雷系（虽然这种用法不常见，不过也勉强算“根据元素搭配来组队”的算法之一）。

- vbi/vbg_amp; INT: 
  - visbm_indiv/glb amplification coefficient， 角色在与上述最佳搭配共同作战时能造成增幅的评分。比如申鹤对冰系的增幅评分是5（E技能期间对冰系增伤97%，同类最高水平了）。并非具体精确数字。

- vbi/vbg_amp_time; DOUBLE:
  - 上述增幅倍率的时间
  
- vbi/vbg_amp_axis; DOUBLE:
  - 上述增幅发挥作用的战斗的时间轴，这样，增幅量<sup>[1]</sup>（vbi情况下，vbg同）=vbi_amp * vbi_amp_time / vbi_amp_axis。简单起见都算20秒的轴。

- bm.; enum{角色名}:
  - best match，如果有定向辅助，和某个人的相性额外地好，可以放在这一栏里面。
  
- amp.; INT:
  - 和best match的增幅效果，因为情况较少，又已经评分化，就不整的像上面一样复杂了
  

[1] 增幅量只是在队伍数据可视化里出现，角色推荐还是按照lcl/glbtier_tag. 一栏的内容。该栏的内容来自玩家社区，认可度更高，考虑想必也越全面。