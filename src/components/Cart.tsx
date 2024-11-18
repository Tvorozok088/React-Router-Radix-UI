import { ArchiveIcon } from "@radix-ui/react-icons";
import {
  Button,
  Dialog,
  Flex,
  IconButton,
  ScrollArea,
  Strong,
} from "@radix-ui/themes";

import CartItem from "./CartItem";
import { CartProductT, ProductT } from "../pages/Products";

type Props = {
  addToCart: (product: ProductT | CartProductT) => void;
  cartProducts: CartProductT[];
  productsCount: number;
  fullPrice: number;
  minusCartProduct: (product: CartProductT) => void;
  deleteCartProduct: (product: CartProductT) => void;
};

export default function Cart({
  addToCart,
  cartProducts,
  productsCount,
  fullPrice,
  minusCartProduct,
  deleteCartProduct,
}: Props) {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <IconButton>
          <ArchiveIcon width="18" height="18" />
        </IconButton>
      </Dialog.Trigger>
      <Dialog.Content maxWidth="800px">
        <Dialog.Title>Cart</Dialog.Title>
        <Dialog.Description>
          Products count: <Strong>{productsCount}</Strong>
        </Dialog.Description>

        <ScrollArea
          type="always"
          scrollbars="vertical"
          style={{ height: 300 }}
          my="3"
        >
          <Flex gap="2" direction="column">
            {cartProducts.map((item) => (
              <CartItem
                item={item}
                addToCart={addToCart}
                minusCartProduct={minusCartProduct}
                deleteCartProduct={deleteCartProduct}
                key={item.id}
              />
            ))}
          </Flex>
        </ScrollArea>

        <Flex gap="3" justify="between">
          <Dialog.Description>
            Full price: <Strong>{fullPrice.toFixed(2)} $</Strong>
          </Dialog.Description>
          <Flex gap="3">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Close
              </Button>
            </Dialog.Close>
            <Button>Buy</Button>
          </Flex>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
