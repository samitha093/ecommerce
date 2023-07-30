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
    private Category categoryId;

    private int price;

    @Column(name = "stock_qty")
    private int stockQTY;

    @Column(name = "sold_qty")
    private int soldQTY;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = false)
    @JoinColumn(name = "product_id")
    private List<ProductImage> imageListId;
    
}
