import { MinusIcon, PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import { Avatar, Box, Card, Flex, IconButton, Text } from "@radix-ui/themes";
import { CartProductT, ProductT } from "../pages/Products";

type Props = {
  item: CartProductT;
  addToCart: (product: ProductT | CartProductT) => void;
  minusCartProduct: (product: CartProductT) => void;
  deleteCartProduct: (product: CartProductT) => void;
};

export default function CartItem({ item, addToCart, minusCartProduct, deleteCartProduct}: Props) {
  return (
    <Card mr="3">
      <Flex gap="3" align="center" justify="between">
        <Flex align="center" gap="3">
          <Avatar size="3" src={item.image} radius="small" fallback="T" />
          <Box>
            <Text as="div" size="2" weight="bold">
              {item.title}
            </Text>
            <Text as="div" size="2" color="gray">
              {item.category}
            </Text>
          </Box>
        </Flex>
        <Flex align="center" gap="3">
          <IconButton onClick={() => minusCartProduct(item)} disabled={item.count===1}>
            <MinusIcon />
          </IconButton>
          <Text as="div" size="2" weight="bold">
            {item.count}
          </Text>
          <IconButton onClick={() => addToCart(item)}>
            <PlusIcon />
          </IconButton>
          <Flex align="center" gap="3" width="150px" justify="end">
            <Text as="div" size="2" weight="bold">
              {item.price} $
            </Text>
            <IconButton variant="surface" color="red" onClick={() => deleteCartProduct(item)}>
              <TrashIcon />
            </IconButton>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}
