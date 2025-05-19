import { Map, Placemark } from "@pbe/react-yandex-maps";
import {
  Blockquote,
  Box,
  Button,
  Dialog,
  Flex,
  Strong,
} from "@radix-ui/themes";
import { useState } from "react";
import { Slide, toast } from "react-toastify";

type Props = {
  productsCount: number;
  fullPrice: number;
};

export default function Buy({ productsCount, fullPrice }: Props) {
  const email = localStorage.getItem("email") || "";
  const [coordinates, setCoordinates] = useState<[number, number] | null>(null);
  const [address, setAddress] = useState<string>("");

  const handleMapClick = (event: any) => {
    const coords = event.get("coords");
    setCoordinates(coords);
    fetchAddress(coords);
  };

  const fetchAddress = async (coords: [number, number]) => {
    const [lat, lon] = coords;
    const response = await fetch(
      `https://geocode-maps.yandex.ru/1.x/?apikey=bb2b1196-1353-4f13-ba6f-75bfc918ca3e&geocode=${lon},${lat}&format=json`
    );
    const data = await response.json();
    const newAddress =
      data?.response?.GeoObjectCollection?.featureMember[0]?.GeoObject?.name ||
      "Address not found";
    setAddress(newAddress);
  };
  const saveAddress = () => {
    if (address) {
      localStorage.setItem(`${email}-address`, address);

      toast("Address saved: " + address, {
        position: "bottom-left",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: 0,
        theme: "light",
        type: "success",
        transition: Slide,
        style: { zIndex: 999 },
      });
    }
  };
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button>Go to checkout</Button>
      </Dialog.Trigger>
      <Dialog.Content maxWidth="800px">
        <Dialog.Title>Making an order</Dialog.Title>
        <Dialog.Description>
          Products count: <Strong>{productsCount}</Strong>
        </Dialog.Description>
        <Dialog.Description>
          Full price: <Strong>{fullPrice.toFixed(2)} $</Strong>
        </Dialog.Description>
        <Box width={"100%"} height={"350px"} mt={"30px"}>
          <Map
            defaultState={{ center: [55.751574, 37.573856], zoom: 9 }}
            onClick={handleMapClick}
            style={{ width: "100%", height: "350px" }}
          >
            {coordinates && (
              <Placemark
                geometry={coordinates}
                properties={{
                  balloonContent: address,
                }}
              />
            )}
          </Map>
        </Box>
        <Flex direction={"column"} gap={"2"} mt={"30px"} mb={"30px"}>
          <Blockquote>Selected address:</Blockquote>
          <Strong>{address}</Strong>
          <Button onClick={saveAddress} disabled={!address}>
            Save the address
          </Button>
        </Flex>
        <Flex gap="3" justify="between">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Close
            </Button>
          </Dialog.Close>
          <Button>Buy</Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
