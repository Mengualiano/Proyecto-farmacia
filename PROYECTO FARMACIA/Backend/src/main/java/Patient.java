import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.time.LocalDate;
import java.util.ArrayList;
import java.sql.Date;
import java.sql.*;

public class Patient extends Person {
	
	public Patient() {
		super();
	}
	
	public Patient(String name, String mail) {
		
		super (name, mail);
	}

	public void load(String mail) {	
	
		Connection con = null;

        try {con = DriverManager.getConnection(
                "jdbc:mysql://localhost:3306/farmacia", "root", "");
    } catch (SQLException e) {
        e.printStackTrace();
    }
        Statement st = null;

        try{ st = con.createStatement();

        } catch (SQLException e) {
            e.printStackTrace();
        }
        String query = "SELECT * FROM patient WHERE mail = '" + mail + "'";
        ResultSet rs;
        

        try {
            rs = st.executeQuery(query);
            while (rs.next()) {
                String Pmail = rs.getString("mail");
                String name = rs.getString("name");
                this.setMail(Pmail);
                this.setName(name);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }




        try {
            con.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
		
	}
}
