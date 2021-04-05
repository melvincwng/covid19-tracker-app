import About from './About';
import { render, waitFor } from '@testing-library/react';
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
const mockAxios = new MockAdapter(axios);

describe("About component", () => {
    const aboutData = [
      {
        title: "About COVID19sg",
        body: "testing",
        body2: "testing1",
        body3: "testing12",
        body4: "testing123"
      },
    ];
  
    beforeEach(() => {
      mockAxios.reset();
    });
  
    it("should render the About component", async () => {
      mockAxios
        .onGet("https://covid19-tracker-app-express.herokuapp.com/about")
        .reply(200, aboutData);
  
      const { getByText } = render(<About />);
  
      await waitFor(() => getByText("About COVID19sg"));
      expect(getByText("About COVID19sg")).toBeInTheDocument();
      expect(getByText("testing")).toBeInTheDocument();
      expect(getByText("testing1")).toBeInTheDocument();
      expect(getByText("testing12")).toBeInTheDocument();
      expect(getByText("testing123")).toBeInTheDocument();
    });
});
