import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecommerce.products.entity.Category;


public interface CategoryRepository extends JpaRepository<Category, Long> {
    
    // custom query methods
}
