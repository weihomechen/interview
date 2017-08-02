function sort(arr = []) {
  const teamList = [];
  arr.forEach(item => {
    const itemArr = item.split(';');
    if (itemArr[2] === 'win') {
      // 第一项加2分，第二项不加分
    } else if (itemArr[2] === 'lost') {
      // 第一项不加分，第二项加2分
    } else if (itemArr[2] === 'draw') {
      // 平局。俩项都加1分 
    }
  })
}

// 循环数组，如果first或last为true，就分别提取出来，如果超过俩个就是无解；
// 如果before或after为true，再循环数组，找到符合条件的数组项，进行插入，删除原本的数组项。
// 最后将first、temp和last三个数组首尾相连
function sortByCustom(arr = []) {
  const temp = arr.slice();
  const first = [];
  const last = [];
  let flag = true;
  temp.forEach((item, index) => {
    if (item['first']) {
      if (first.length) {
        flag = false;
      } else {
        first.push(item);
        // 需要防止数组塌陷
        temp.splice(index, 1);
      }
    } else if (item['last']) {
      if (last.length) {
        flag = false;
      } else {
        last.push(item);
        temp.splice(index, 1);
      }
    }
    if (item['before']) {
      temp.forEach((item2, index2) => {
        if (item2.id === item.before) {
          temp.splice(index - 1, 0, item2);
          temp.splice(index2 + 1, 1);
        }
      })
    }
    if (item['after']) {
      temp.forEach((item2, index2) => {
        if (item2.id === item.after) {
          temp.splice(index2, 0, item2);
          temp.splice(index, 1);
        }
      })
    }
  });
  if (flag) {
    return temp.concat(first, temp, last);
  } else {
    return '无解'
  }
}


// 循环数组，将parentId跟数组其他项比较，如果相符，并且符合条件的该项本身的parentId不在当前项的子代中，就插入到该项的subList数组中。
function makeTree(arr = []) {
  arr.forEach((item, index) => {
    item.subList = [];
    if (item.parentId) {
      arr.forEach(item2 => {
        if (item.parentId === item2.id) {
          // parent不能在自己的子代体系中
          item2.subList.push(item);
          arr.splice(index, 1);
        }
      })
    }

  })
}
