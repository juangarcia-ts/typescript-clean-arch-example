import { MemoryStorage } from "./common/storage/MemoryStorage";
import { Coupon } from "./order/Coupon";
import { Order } from "./order/Order";
import { PlaceOrder } from "./order/PlaceOrder";

function main() {
  const orderStorage = new MemoryStorage<Order>();
  const couponStorage = new MemoryStorage<Coupon>();

  const coupon = new Coupon("VALE20", 20);
  couponStorage.save(coupon);

  const placeOrder = new PlaceOrder(orderStorage, couponStorage);
  placeOrder.execute({
    cpf: "778.278.412-36",
    couponName: "VALE20",
    items: [
      {
        description: "Guitarra",
        amount: 2,
        price: 249.99,
      },
      {
        description: "Bateria",
        amount: 1,
        price: 3999.99,
      },
    ],
  });

  console.log(orderStorage.findAll());
}

main();
