interface InputState {
  promotion: boolean;
  _id: string;
  promotionPrice: number;
  name: string;
  description: string;
  price: number;
}

interface StateProps {
  _id: string;
  name: string;
  description: string;
  image: any;
  price: number;
  promotion: boolean;
  promotionPrice: number;
  thumb?: string;
}
const updateServiceObj = (input: InputState, thisService: StateProps) => {
  if (input.name) thisService!.name = input.name;
  if (input.description) thisService!.description = input.description;
  if (input.price) thisService!.price = input.price;
  if (input.promotionPrice) thisService!.promotionPrice = input.promotionPrice;
  if (input.promotionPrice > 0) {
    thisService!.promotion = true;
  } else {
    thisService!.promotion = false;
  }
  return thisService;
};

export default updateServiceObj;
