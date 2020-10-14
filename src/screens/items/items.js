import React from "react";
import Item from "../../components/items/item";
import View from "../../components/view/view";
import { useAuth } from "../../util/hooks/useAuth";
import { useFetchData } from "../../util/hooks/useFetchData";

export default function Items() {
  const data = useFetchData();
  const { items } = data.state;

  const auth = useAuth().state;
  const { user } = auth;

  const showData = () => {
    return items.map((item) => (
      <Item key={item.id} user={user} item={item} deletion={data.deletion} />
    ));
  };

  return (
    <View class="flex flex-col items-center justify-start h-full mx-auto">
      <div className="flex flex-col items-center justify-center md:flex-row md:flex-wrap">
        {items && showData()}
      </div>
    </View>
  );
}
