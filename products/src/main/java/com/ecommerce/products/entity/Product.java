package com.ecommerce.products.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.*;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "products")
public class Product extends AuditEntity {
    //table coloumns
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "Product_name")
    private String ProductName;

    private String description;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    private int price;

    @Column(name = "stock_qty")
    private int stockQTY;

    @Column(name = "sold_qty")
    private int soldQTY;

    @ManyToMany
    @JoinTable(
        name = "product_image_relations",
        joinColumns = @JoinColumn(name = "product_id"),
        inverseJoinColumns = @JoinColumn(name = "image_id")
    )
    private List<Image> imageList = new ArrayList<>();

    public void addImage(Image image) {
        imageList.add(image);
        image.getProducts().add(this); 
    }

    public void removeImage(Image image) {
        imageList.remove(image);
        image.getProducts().remove(this);
    }
    
}
