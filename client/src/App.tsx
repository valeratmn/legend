import { useState } from "react";
import { Provider } from "react-redux";
import { Container } from "@material-ui/core";
import Form from "./components/Form/Form";
import TableCampaigns from "./components/Table/Table";
import TableTools from "./components/TableTools/TableTools";
import { store } from "./redux/store";
import "./index.css";

function App() {
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const addFormVisibilityHandler = () => setIsAddFormOpen((state) => !state);
  
  const onOpenEditForm = () => setIsAddFormOpen(true);

  return (
    <Provider store={store}>
      <Container maxWidth="lg" className="container">
        <TableTools
          onOpen={addFormVisibilityHandler}
          searchValue={searchQuery}
          setSearchValue={setSearchQuery}
        />
        <TableCampaigns searchQuery={searchQuery} onOpenEditForm={onOpenEditForm} />
        <Form isOpen={isAddFormOpen} onClose={addFormVisibilityHandler} />
      </Container>
    </Provider>
  );
}

export default App;
