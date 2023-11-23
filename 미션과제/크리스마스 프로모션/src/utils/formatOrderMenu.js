const formatOrderMenu = (orderMenu) => {
  const menu = orderMenu.split(',');

  return menu.map((order) => {
    const [menuName, count] = order.split('-');

    return Object.fromEntries([[menuName, Number(count)]]);
  });
};

export default formatOrderMenu;
