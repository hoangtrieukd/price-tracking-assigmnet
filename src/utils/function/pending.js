const pendingFuncIns = {};
export const pedding = (name, func = () => null, time = 1000) => {
  if (pendingFuncIns[name]) {
    clearTimeout(pendingFuncIns[name]);
  }
  pendingFuncIns[name] = setTimeout(() => {
    func();
  }, time);
};
