import Background from "../components/home/background";
import Card from "../components/home/card";
import { useEffect, useState } from "react";
import Toast from "../components/modules/toast";
import axios from "axios";
import Cookies from 'js-cookie';
import getAccessToken from "../components/modules/getAccessToken";
import { get } from "http";

interface Image {
  id: number;
  imageName: string;
  contentType: string;
  imageData: string; 
}

interface Product {
  id: number;
  name: string;
  description: string;
  categoryId: number;
  price: number;
  stockQTY: number;
  soldQTY: number;
  imageListId: Image[]; 
}

interface ProductCart extends Product {
  isSelected: boolean;
}


 function Home() {
  const [products1, setProducts] = useState<Product[]>([]); // Initialize products state as an empty array
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [productCart, setProductCart] = useState<ProductCart[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<ProductCart[]>([]);

  
  const convertProductsToProductCart = (products: Product[]): ProductCart[] => {
    return products.map((product) => ({
      ...product,
      isSelected: false, // You can set the default value for isSelected here
    }));
  };
  

  //this is for testing
  const products: Product[] = [
    {
      id: 1,
      name: "Product 1",
      description: "Description for Product 1",
      categoryId: 1,
      price: 19.99,
      stockQTY: 100,
      soldQTY: 10,
      imageListId: [
        {
          id: 1,
          imageName: "product1.jpg",
          contentType: "image/jpeg",
          imageData: "data:image/png;base64,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",
        },
      ],
    },
    {
      id: 2,
      name: "Product 2",
      description: "Description for Product 2",
      categoryId: 2,
      price: 29.99,
      stockQTY: 50,
      soldQTY: 20,
      imageListId: [
        {
          id: 2,
          imageName: "product2.jpg",
          contentType: "image/jpeg",
          imageData: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdGuegzHkQpuA355ToePsDuEuBDTaKjK-4AQ&usqp=CAU",
        },
      ],
    },
    {
      id: 3,
      name: "Product 2",
      description: "Description for Product 2",
      categoryId: 2,
      price: 45.25,
      stockQTY: 40,
      soldQTY: 20,
      imageListId: [
        {
          id: 3,
          imageName: "product2.jpg",
          contentType: "image/jpeg",
          imageData: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxITEhUSERIVFhUXGBIVGBYYEhUXFxcVFxYYFxUXFRUYHSsgGBolGxUVITEhJSkuLi4uFyAzODMtNygtLisBCgoKDg0OGhAQGy0mICUvLS0tMi0rLS8tLy0tLS0tLS0tLS0tLS0tNS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAAAwUCBAYHAf/EAEUQAAIBAgQCBgUJBgUEAwEAAAECAAMRBBIhMQVBBhMiUWFxMoGRobEzQlJicrLB0fAUFSNTgpJDosLh8QdEg9JUc+IW/8QAGwEBAAIDAQEAAAAAAAAAAAAAAAMFAgQGAQf/xAA8EQABAwEDCAcGBgEFAAAAAAABAAIRAwQhMQUSQVFxgZHwEzJhobHB0QYUIlKy4SMkQnKC8TQVM2KSov/aAAwDAQACEQMRAD8A9xiIhEiIhEiIhEiJr4vErTRqjmyqCT6u7xiQMUAm4Lj8d0sqq7KoTRmGqnkSO+TYTpFiXF8o9VIn/VOLxOOLOzZRqzHfa5JtJaXFnAtYW9f4Tnxa6mdJcYXUuyczNGawTz5rvf3tW5m3/i/3mP73q/SH9g/OcN+9j9Ae1vzkycVknvjtZ4qE5MuwHALq6/G6w2f/ACLK9+kmKGzg+dNfwlK2P8JG+NHMe+RutL3YOI3rNthaMWA7gr2n0pxV9WT10/8AeWWH6Q1zv1f9p/8AacaeJqPmE+ubNDjijdD7Zky01Bi4rx9iaR8NMdy7UcZq9yf2t/7T6eLVfq/2/wC85ReP0ua1PdIK3SOx7NM2+s2p9g0k/vZ+Za/+nknqLqsRxGqR6die7SbnRrFs/XK7FilQWJN+y1NCPfmnn2I6VVbjLTUeYJPsvLrofxV1frKw0rvlva2XKAtM25LfMPXeZ07R+ICTdgvK9ge2iTAnRhOs9wO3BehxES0VGkREIkREIkREIkREIkREIkREIkREIk5Lplj1y9WRcAi473+b6hv/AMToOI4rq0J5nRfP9azzXilZqjk6kC9tDrrqfMmU2VLSbqDNN7tmr+XhKs8mWfpKmecB4rUwOD6xwo23J7hzM6EcLo/yxHCMHkS/zmsT5chN0ictaLQ5z4abgrOvaHOfDTcFpfuuj/LHsj92Uf5a+yboEFZr9K/5jxKg6R+s8VqDAU9ggmDcOo/QW83SZgZ6Kj/mPErzpH6zxWgeHUvoL7JnT4dS/lr7JuBO+ZCZ57tZ4lOkfrPFan7vpD/DX2CSLgqY+YvgMomwo+c3qHfM111O88c4jSeJWBqO1nisKWDUa5V9gm0BMFMzDd81yM7E8VGSrzhuJzLY+kPeORm/OZo1ijBhy945idFScMAw2M7bI1u94pdG8/G3HtGg+vHSq+vTzXSMCpIiJcqBIiIRIiIRIiIRIiIRIiIRIiIRVXHRdV8zPPwOw/ffs+ABOa/nPQOOHRfX8JQfsdIG/Vpr9UTkspVxStrzE3N8Od96uLDVDKd+ueB53Ss8KvYX7K/CSZZq4nGBSqBWZ2F1poBmyjTMxJARAdMxPleAcR/JpW7jimv7sOR75VdEYDnENnCTee2ACY7TC9g4+Y81tWnzLIOvcelQq+aGlUA/udT/AJYXrn0SlkH06tr/ANNKmxv5sw8jPfdXHEtjXnAj/wAknuTDT3qVgALmwHMkgAeZOkwo1KbGyVKbnuSrTc+xSTPowVIMoqEVKmpBqlS2m5RPRUfZAmpjmw9UKqhHdsxXq9GHV2DMtQDslSRz9syY2lMQ49tw1+QJvcjYOvhz3xdet7qxMloia/D6rkOlQ5npPkZrWzqVD06h8Suh8VPfN0TGq3o35uOBB1giQb14QQYWriE7XhbSRVcUqGxve19FY6eoTcqiVPEMJdswFzoMu5PldgNvCaxLOkh5hZ0wCb1O3EV2yuf/ABn8ZHU4uo+a3rNMX0vzaaf7E/NRtzFJbWtbW57vdPn7PsL0xrt1qDW97aL+rSQU6Oud6lzKY/tWWE4irtlsBvbtKb+oHu1nV8H+THm3xnJ8NpgalwzG+zZlt4aDlOs4P8kP6vjLXIeYbac0YMO+9t60bbGbdr9VvRETsVWpERCJERCJERCJERCJERCJERCKp4/6K+Z+EpxLrjY0XzPwlMy6ETicuwLWe0BWNmP4fFc9ia7ihisTTfLV62rqRmIp0zkp0xfQWGt9eems1+GcVramlUNValahRptXI7NRkL1mZVAOXTQaXuJsYyj8sjB+prHO7IhdqVQkdYSg16trXDDYmx8csuEcs2d6xYUswpq7HNSFlqAUlzI9r63+dJa7S4uIaXBxlpDc674YG68RIgAiIMqzaW5hlszqEx1YB2QRjgNRBU/B+M1KtZVqFFUU6ua2itUSuKQNMnWx7ryrrYkVsKSa1R6yuwKLVckU2xATtU1PaGXQX2DeU3xicECinDDsAKoZaF1AJI7D1M17kna95Y1+NUKSEqMhAzFGU0so+nUuLqtyACAcxNlDHSSU6NRhkUnC8RIjXp7ZvvUWe0OljdI0jROOOIN943wqjEcHK1ilOgbGrh3St82lSp3Li5OYNmzac815n0e4HVovTqPYAJVzrmvZ2b0lI0sUVL66WlRjenw1FNXPioSmPUzipfzKr5CW3R3HftaqayVMrPks9YMh1Asy01QMPBgR4TL3O0uGa5zQHQDiThH3xidqyqVKzaXx4YHGcI/UR/d6uOGtmapVHou6hT306a5FbyY9YR3jKecsVWQURabCSgqVxVqhzcLgNjQAJ3CdpWs7FfHpyobglLMXtqWL63Iub3Njpux5S8qbSlxfBxUcu5vsLBSNBtqD3XmTqnRVCOkLARfAmeyJHilM3YqE4EKDlVbX0yhO/uWl3ePKT0KY0uwW+4zEHTTkZAOGLTFlyjftMUvqSx1amTqfHnMhVop6eIoqP/vUflI3VGwQ10jsGjZJjvWWbOAW6hp37LXO3yhbl4nwnR8F+SHm/wB4zkaHFMMWCpiEZibACtmufIG067g4/hL5t94y49nWkWoyD1Dj+5q1bW1zWAERet6Iidoq9IiIRIiIRIiIRIiIRIiIRIiIRVnGdl8z8JUNLnjA0XzPwlO284vLw/M7h4Kws3UWriiVRnQLmuoGYkDnzAnm3GqeIxWKelmYksbIax6sWAvbOQo/Mz0niPyR7IbtJocvc/0jaeXcWxDpiajIxQ3PonuYMBceKqfVN3I5/LsH7vrKs8n0w+q+4TF0jZv4LWHR+qFLdWMoBYnOnZACk3F+ybOnZOvaGms2/wB2YwU+oynq1YtkupCuq3JGugCve22t95YYTHUjQUVMTVFTq6q5bnJvkRCbHQ0xqddgNdBNirxGlU/7yupbkwAsOsS+fKNSEudL3KDbQS4DW8lbzq1bOgsFx+V24j1XP1+FVkDF6ZUKAWvbQFmpg77F0YDvtfbWdt0ErZaVIWY5qgGliPSXWxPw7pyPEeJ1M1RErO9IlrEndSWYBxYXILNuNCTYCdb0EqHLSAVvlNSAwG43YCx8ryJ9xEawocol7rLL4xBukXZpxB0/1oXVJJ0kKyZZ8+oaFVuWbnSedvwvFF36xbqWfKWrKdCxI0NTTQi2k9CeUmKoDOzFDc5dcwW9hysMw25y0s1sfQqktiSNN+Gq8KWjWNIGBjzcuTbhHMth1Ou9WkOf2GPKblDo5VsD1lMDUDKXI7tAKY5gzqcAQFCjMDva7N7GcXMlxCgg3F7ai4B11sbDeSvy3a87NmBs8jKlNrqEaFzXDuj79dTqNWuKZU5Mr6kX1u7aHXu7p6Twj5Jf6vvGcxhKajYAa8hl906fhPyS/wBX3jLDItqqWi3Pc8zDIwA/U3UtC3VHPY3O0fdbkRE6xVqREQiREQiREQiREQiREQiREQir+L7L5n4SkeXfF/RXz/CUjzi/aH/I3Bb9m6igxlurNxcZ05gW7L66zzbjXDC1aoyNcFie1mB38dZ6XXtkNyR2k2bLfRtL/kRtOZ4hwqq1R2VCQSTclR6t5Nk97m2WmW/8vrcrKwVW06ri4xd6LjF4TU+qP6paLwigKZuzvUIsNLIneTzc9w0AvztLp6rqP4lJDsLlOdsu4O/467zBa2uTqFLa6FTmv5C1uegA9UsOnd8w/wCp58VZOtD3X+Dm+s+C5w8H7n9onc9CaJSnSVgL521v9aVD4Wo/aFLKAouACNBztuTbe0vujtEoU5gkEkMSrA7MpFweQ5fCY06lRzoJkbFp5Rqh9ECRMzEg6Dq2q3STrIacnWcZRFwVe5KwlXiKBLXuSO4Kh0HK7ev2y1rykxNIFjdUNyBrQZv7je1tN+U2aoirdq1SvG4KShTymwFzyzdWCPLIPP2SfEDsG4toO8DTXcaz7hqAUAALcX9EZR6gNpjiagAN2APnY+omanSBzwR2LNZYc6es/rWdHwn5Ff6vvGclTx9K+TraRYk2XraZY89Be86/hXySeX4zpPZtp95qE/L5hatruaNq24iJ2K0EiIhEiIhEiIhEiIhEiIhEiIhFX8XPZX7X4GUlSXPGTovmfgZTVJxXtCfxzsHgt+zdVanEXtT9PLd0+cgzdmp2Rn0PlNH9sNwr06gGpzqUsBbnka49V5v4+/VHLTNQ5lsoYKfRfXMTp6pUhSSqvTKOL6KwqAeasL+sL65Nk/8Axaew/W5SnE86ApnqG6lTm3sShe3gT6S+u00qtE1SwCNScbMSrBvsHMTTPmPIyOpTqMQTXUlT6NJXKjXYhSTe3ebeEyagClqlUsQRZh/DJv8ANZad8xt3qJugc3rxWOBxOnV1iFqLbtA232Y6aHxtabuBw7JWBBC3bt/QqXB1C/Nqd9tD69K1MOgHby2AYdpSWsdwLkEC3ICWPDMYmdVDAgsQPS0ax7IuTbbbSZs6wlYnAwrCnJBI6ckE46lgFMVlUnnGJw2OLENiQngcYEsPEK09HqSqxVRlOhYXPdTHftffl7vGbbbQ6lUIa1pkfqE4atSloVzSkgDeJXNnhtVhd6qEkC9s1QX52/hHTf8AQkT8BFRTTV7cyBQJ7Pdqq6XO8uaoS5Zst9blkHMd4/XLeS4UgkinY6X7FQEWJ3sdpvuynaYkOjc2PBZC01G4eCqOEdFVp1VqF6t01F0RVNwRbRiefunpvCvkl8j8TOUw9AqNQAbW2Gb1kG1vCdVwo/wl/q+8Zt5CtFSvaqhqOzobE3fMNS1LfWfVAc8yVuRETq1WJERCJERCJERCJERCJERCJERCKr438zzMqaktOOf4f9X4SrecNl7/AC3/AMfpCsLN1BvWnxLCJUpWemr5XVgDfcK1jp59xmstO6WuApFiMpYHwu+49VpLxjErTpqWv8ooFmykGx1vylV+8KTkMy1LgaPZgQPMAI027DdZaew/UVLBMr5iKqegWJHcQtrbbKLW9U1UezZUdrsNAoogJyBKkqzDUbgyTGU6NQG5B53sym/fdTofG8jRF0A1HeWufeD79fGbQcvQLlt0il+2/a+cFGv1b5SxDC+lu/leb3CVUVVKKAGLEkIqk9k+nnOYnnoBNSjhaTAl7kIBffnoFG1ybd3KbvAuIUmq9WiZSA/MHZe+3jJGtiCsHSQYCuKckEwpyQTj6WAUhX2pK3F1zqqh794F9N9LG8sKp+Eoq6Zr9tvU9+/SzXt/tJXsDqt+heA3J1LWuQx8TnU7XvcxUcD0mUeDVKZH+YgySnTU3PV0V2uTTUn3nX/eblJBbsuNPohPZzmLqpbj5+Ur2FHhqhIN2BtYaam9tbm58PbOm4L8ivm33jKApbdmPnb8B+ry/wCC/Ir5v99pcezZDrW8j5D9Tdi17V1BtW9ERO1WgkREIkREIkREIkREIkREIkREIqbjp7VLzf8ACVryx4+e1T/8n+mVzCcLluXWyoAJPw/S1WNn/wBsc6StXHrdVvb0+e18ptccx4SoqU61/kww5+i1/shiFA33v6pZ47Eg2pqQe1qc2UAW5aa+6fW4M5Yq7BKQF8we7Enz2/W8tLHZagoMZF4EHsvJviVkXZp+K5VD8PzHtYeg32kUa/ZUGVn7XhVq9QGw4qg2KLTJF/ohiygt4Tqq3RdbEJXqqWFi91LgHfISLLy1sT5bymxvQnh9PDBKlMmou1UMwqO5JsbjfU7a+uWLLI5rZee9YdMwkAX7vusK1NmAp0UCg3OgCjXRma3PT3CWXRzhSUXBJDVDm7WmgysQFF9tT+toeG08QluyuSwBDG1QkfO0GUE72PM8pc4MdtTf6XMfQPdInMfMkLOo4hsaFsJJJgkkE4qlgFIVHXPwlEK+bx7iLMLd+mv/ADLvGm3sM5vCoDqyFjyuqg38WUHlbXwm0GDOcTojz1wO9YjBTjFqupIHmCvjpm0vzlxhquZb2NuROXUb3GUypooDYU6YN9/49Q20tqDbl+tJa0tB6JXfQ29uhM1bVmwLr+0jyKzC+1TLzgRvQXzqffac9WaXvRx70fJn+N/xlv7MXWl37T9TVr2vqDarWIidwq9IiIRIiIRIiIRIiIRIiIRIiIRUfSL0qQ+3/pnPdIK5WnodyL+WssOmGCq1alEI2VQKma7EDdbaDfYytwXB0pHPVbONLrl0Jvpe511nM2mxk251Ym6R3MAxnarezBjaTXE36o7TuVKlYJSaq9wBrm5e2dUuN65FYgAWB1NjfvXuIve/gO+TcUxhy5cpBsdG09043ilRk6s3sHzgpfYoRr5EMPZNtlenSJbTcHGL939qUt94guEQbtPOCvauOCXZnGl7sBqMoJzgbdrYpew3B5SOjjDXZSAQFsUJRGVmuA2QOtyu4z2HpDvmhhUzJrudBN7hq1czJUptTRlyhw1MnfLlGU9kAE2FrWvc3N5PRtRdc9Z1KdMCYEjnDTzgb1koPOouUB7sKWTsIpV3DK1hqxUA2JJJmjjjVzjLXqoMwV0FRy2ZxmNNTnAzKiqTfQEm19pnxqq1NkyWAZE0AOvVEgAjcJTKZ8vPMAJX4fDVqzWcstJQxqG9ms4zsPWct7A2DhR4zFxJiCtim34c8m7kYYdm2+Rgumw3EUsCXBW+XNrc7hC19cxynNyuL7HTcTG0zYhgR/D1B07fokHYgkW0nGcZqmuq4fDMqWNEuSVATILU0sWuSWztoL6i4ubC74fhgiWZi2lRdBkJRiBlBc9oZiWFiLcrytr5Lo1qpqXidUROv1AiVrPpNGMjnnnG44k1h6jOWXHKQDlQXIA/iEjUMdMlr7eHOWfFuKKnZIY6Gx0OgJXUm2undOb/AH0oNlHja4U+fZP4SnfZXsqOa5snsMc8Fgyz1XAEBXrcSqXUAgDW+VDawvzb1S1NXScknSBlFwnhdnZpDV6R1jsEH9J/EzVq5PqPgNYBHaL+AU7bHV0+K6qq86Dos38JvCofuofxnlb8arn59vID8p6B/wBN67Ph6pcknrmFz3dVSlxkWxvoWjOJGB19i1rdZnU6WcSMQuviInVKmSIiESIiESIiESIiESIiESIiEXEdO+JPQrUGUZlyVMw5+kliPaY4diaeKTNTa/eL7HmLTY6bcMFYoetNMhWANgym5B1BI7twZw44VisO/W4d6TnmEqgZh9ZKlr+omUtoc11dzQRN1034BXNnYx9nbDodfjtOnDvXS4nCYoMQEVxyOfL7QfwlfxXhG1XEMVyi1lOm/LTf2e602h0wC0716NSm49IFGt5ggWYeXulRiOnefSko9dlHv1kBoNaSWtg7Oe5Ss6cmAMNS28HjKJOWijOdrk2XzJ5D9a63tjiqVMM2IqJci2VRcKNTa/M6235Tj34hXq/PVR9WxPtP5SP9iB1e7H6xJ+O0j+Fhmb+di2vdXvxu8V1WG4qtVRVpsCAWa9gTmJyE2HzahF3tqu+xk702fMGuwJ7QzWUHcAtvUcHVH2YdkmcW3D8pD0Wam41BUkazFeKYilYNqACoKtkZQTdspG1+7bwlgy1Nehs5bhzzz29ngKCUVUo5ysyksHqZLIDc3ViUGuzbHmZlRxiLlzELmGhzMUZQ2YnPcjXuYC/hOfwPHcPUbtOabmylhZWCAbMp7NS/gb+EvcP1ZuUAIcZm6kBhkGyth21BP1ZKHalC9gj4p5+2/sEiKnpNVuitZlOU6MNbX0NwSCDy5984uhhqatmzs9S98wAAudr3+A5TreOUqxDE4WuuY7Cg9lHcNNpS0ODVzquGrf1U8nszETVl8ucWm/0W7SzGtEuw7Qrus6CibWylEA03fKL69+YknylCRLKl0exjf4Sp9qvT+CkmbSdFcQfSq4dR51SfuAe+atSowdZzR/JvqorKyjZg4dJMknmJ46VRqJ6h/wBMlthHPfWc/wCVB+E5Ol0Oc+lirfZoA+9m/Cd30N4d+z4c0w5fts12AB1C8h5TYyfWpOr5rXgmDgZ1di18qV6b6Ga0zeNB7dcLoIiJeLnUiIhEiIhEiIhEiIhEiIhEiIhFSdIPSTyb4iVJpg7geyW3SHemT9cfdlYAJxGVW/nam76Wqzs5/DHOlRGkvcJ8fCo2jIjfaRW+8DJTaR4iuFW+5uoAvuzEKgvy1I1mnTLwYaY2GPNS4qFuEYc70KPqpqv3bSJuAYQ/9unqaqPg8YLiyVNM4zXy5TTYXN7aMCQNb/2tpobfanFEG5qm9rCmq63VWHpEk6Op2G+0sGvtgHXd3+YUgNUGATxK+L0fwf8A8df76x+LyVOEYYbUKXrTN968nwrEg5twRr3gqrC/jZrHxHLaTyJ1qtDTBqHisXVXuxceJWl+58P/ACKQ8qar8BJaPDKKkMKagjnYaTaEwqtY2OxBEw6V5HxOJ3lR3ytJ2ub+MlLDSax00kxpgkHmJXvaNKlCzJPh7Zks+TNN5gvVIsvOC/J+s/ASkl5wdSKfmSfw/CW/s+Pzh/afFq07V1N634iJ26r0iIhEiIhEiIhEiIhEiIhEiIhFqcQwgqoV57g9x5TkagKkg7g2PgZ3M5TplwoGm9ekiZwO2StyUA1K8gwHO17DwEpsqZNFoio0wRjdMj1Hgt2xVAH5jjcfFVpkNelmUj3jke+UKcRSw/hDQW0YC+ulyFvewtcEXuSb6W+jiCD5tS+W3yhHa07Wh89JSDJ8GW1Bd2FXHu1QaD3eqs0wfhTvpqaSEm1rXJX6o27hNlM/M5R9FBlA8rSmPEqdxY1wM1yC+bsWOl8297frWZjiCm+WrUHZ09EnPzBB8fHbmJm6y1SIzmcAPJYmg/UeH9q/okgdlj367k8yZKuKI3F5zrcQFyBWPotbMlu3fsg2XbKd+9TsCJM3EdCVqqeYVksSLLa5JAvfPceA5mQGwV5mQf5BYOoO5DvRdGmLXncSRsriwI9s54Y3Wwq0T2gL5WAsQe0DfUXFvZ3zWrcZZLXCNdQ3Za9r7qd9QQRPDZa7R8TQRtCxbZy4w3Hh4wrzEoQbn1z7RbSUidIQf8Ox+1ofdNDF9KXW4SiAfrEn3ASE2Sq83DvClFlq4R3j1XXgSVUnnv8A/ZYg/RXwVfzN5vYTpHVIJLe4T12TaovcQFkbFVjQu6pUySANzOlRLAAcpQ9GOHuqdbWJ6xxop+YnIW5Mdz7O+dDOlyPk42Vhc8/E6Nw0DzO5UdqeC/NBkBIiJcrWWLNMWt/zGbT3/lIATqbwimBHL8pmrSGmQPL4GSAfr8fhCKSJD10QimiIhEiIhEiIhEmFRAQQRcHQjwmcQi8jrYVEYrc9kkalr6G3OSYfC0zuFt9pB8TPVWQHcAyBsFSO9JD5ov5Sr/04zId3fdXQyvIgt7/svOmwlD+Wh/rP+lZE+Gofyx6hUP4ieivwfDnekvqFvhNWp0Zwx/w7eTv+cxNhqaM3v9F63KdPTnbo9V581GkPmt5XFvfeQGhS5D/NO/qdD8Mf5g8mH4gzWq9B6J2qVB55T8AJC6wVtQ4/0thmU7P8zuH3K4oYdP1eZDBIeZ9n+86l+gh+biT66f8A+pA/QrED0a1M+YYfAGRe51h+jvHqp/f6Bwqdx9Fz54ODtUUecjq8DY6Z0bu9K/ttOgfopixt1R8nP4gSFujuN/l+yon5zzoKg/Q7cCvRamnCq3iPsuK41wCrSXrct1FsxBGnjbu8Z1H/AE16P9ZbEVBemp7II0Zxz8VU+8eBmeJ6O4qopo9Uwz5ULG1lVmAZt9bC5t4T0Xh+CSjTSlTFkRVVR4AW17z4zdslEvMvBAGvnm5alvtxbSzGuBLtI1d95w43TC24iJarn0iIhFGdrer2SN15jbn4GTMJh+vH1wiiVb7bczJgOf6/WkAd8yAhFF1RiTxCJERCJERCJERCJERCJERCJERCJERCJERCJERC9SIiF4kREIkREIkirxEIsaEniIRIiIRf/9k=",
        },
      ],
    },
  ];
  function getAllProductsFromStore() {
    const myHost = sessionStorage.getItem('host');
    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json', 
    };
    axios
      .get(`${myHost}/api/v1/getallproducts`)
      .then((response) => {
        if (response.status === 200) {
          const products = response.data;
          setProducts(products);
          console.log('Retrieved products:', products,{ headers: headers });
        } else {
          Toast.fire({
            icon: 'error',
            title: 'Failed to retrieve products'
          });
        }
      })
      .catch(() => {
        Toast.fire({
          icon: 'error',
          title: 'Failed to retrieve products'
        });
      });
    
  }

  useEffect(() => {
    // getAccessToken();
    // getAllProductsFromStore();
    const productCartItems = convertProductsToProductCart(products)
    setProductCart(productCartItems);

  }, []);

  function getAccessToken() { 
    let refreshToken = sessionStorage.getItem('refresh_token');
    const myHost = sessionStorage.getItem('host');
    axios
      .post(
        `${myHost}/api/v1/auth/refresh-token`,
        {},
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          // Check if the header exists before accessing it
          const refresh_token = response.headers['refresh-token'];
          const access_token = response.headers['access-token'];
          setAccessToken(access_token);
          // Toast.fire({
          //   icon: 'success',
          //   title: 'Refresh token function run successfully',
          // });

          sessionStorage.setItem('refresh_token', refresh_token);
         
        } else {
          Toast.fire({
            icon: 'error',
            title: 'Refresh token function failed',
          });
          console.log('Refresh-Token header not found ');
          
        }
      })
      .catch(() => {
        Toast.fire({
          icon: 'error',
          title: 'Refresh token function error',
        });
      });
  }
  const productSelect = (id: number,isSelected:boolean) => {
    console.log(id,isSelected);
    if(isSelected == true){
      isSelected = false;
    }
    else{
      isSelected = true;
    }
    const productCartItems = productCart.map((product) => {
      if (product.id === id) {
        product.isSelected = isSelected;
      }
      return product;
    });
    
    setProductCart(productCartItems);
    console.log(productCartItems);
   //is selected true products filter and add to selectedProduct arry
    const selectedProduct = productCartItems.filter((product) => product.isSelected === true);
    console.log(selectedProduct);
    setSelectedProduct(selectedProduct);
  
  }
  return (
    <div>
      <Background/>
       <div className="grid grid-cols-4 gap-4 mt-5">
        {productCart.map((product) => (
          <div key={product.id}>
            <Card
             product={product} 
             productSelect={productSelect}
             />
          </div>
        ))}
      </div>
  </div>
  )
}
export default Home;