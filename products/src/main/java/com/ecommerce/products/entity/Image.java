package com.ecommerce.products.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "product_images")
public class Image  extends AuditEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "image_name")
    private String imageName;

    @Column(name = "content_type")
    private String contentType;

    @Basic(fetch = FetchType.EAGER)
    @Column(name = "image_data")
    private String imageData;

    @ManyToMany(mappedBy = "imageList")
    @JsonIgnore
    private List<Product> products;

}
